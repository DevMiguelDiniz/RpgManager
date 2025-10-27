"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, Scroll, ArrowLeft, Edit, Trash2 } from "lucide-react"
import { mockPersonagens, mockUsuarios, getCampanhasByMestre } from "@/lib/mock-data"
import type { Campanha } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MestreDashboard() {
  const mestreId = "u1" // Mock logged in user
  const [campanhas, setCampanhas] = useState<Campanha[]>(getCampanhasByMestre(mestreId))
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCampanha, setEditingCampanha] = useState<Campanha | null>(null)

  const handleCreateCampanha = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const novaCampanha: Campanha = {
      id: `c${Date.now()}`,
      nome: formData.get("nome") as string,
      descricao: formData.get("descricao") as string,
      mestreId,
      jogadorIds: [],
      dataCriacao: new Date().toISOString().split("T")[0],
      status: formData.get("status") as "ativa" | "pausada" | "concluida",
      imagemUrl: "/enchanted-valley.png",
    }

    setCampanhas([...campanhas, novaCampanha])
    setIsDialogOpen(false)
    e.currentTarget.reset()
  }

  const handleEditCampanha = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingCampanha) return

    const formData = new FormData(e.currentTarget)

    const campanhaAtualizada: Campanha = {
      ...editingCampanha,
      nome: formData.get("nome") as string,
      descricao: formData.get("descricao") as string,
      status: formData.get("status") as "ativa" | "pausada" | "concluida",
    }

    setCampanhas(campanhas.map((c) => (c.id === editingCampanha.id ? campanhaAtualizada : c)))
    setEditingCampanha(null)
    setIsDialogOpen(false)
  }

  const handleDeleteCampanha = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta campanha?")) {
      setCampanhas(campanhas.filter((c) => c.id !== id))
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      ativa: "default",
      pausada: "secondary",
      concluida: "outline",
    }
    return <Badge variant={variants[status as keyof typeof variants] as any}>{status}</Badge>
  }

  const openEditDialog = (campanha: Campanha) => {
    setEditingCampanha(campanha)
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    setEditingCampanha(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Área do Mestre</h1>
                <p className="text-muted-foreground">Gerencie suas campanhas e personagens</p>
              </div>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={(open) => !open && closeDialog()}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingCampanha(null)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Campanha
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingCampanha ? "Editar Campanha" : "Criar Nova Campanha"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={editingCampanha ? handleEditCampanha : handleCreateCampanha} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome da Campanha</Label>
                    <Input
                      id="nome"
                      name="nome"
                      defaultValue={editingCampanha?.nome}
                      placeholder="Ex: A Queda de Eldoria"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea
                      id="descricao"
                      name="descricao"
                      defaultValue={editingCampanha?.descricao}
                      placeholder="Descreva a campanha..."
                      rows={4}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select name="status" defaultValue={editingCampanha?.status || "ativa"}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ativa">Ativa</SelectItem>
                        <SelectItem value="pausada">Pausada</SelectItem>
                        <SelectItem value="concluida">Concluída</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button type="button" variant="outline" onClick={closeDialog}>
                      Cancelar
                    </Button>
                    <Button type="submit">{editingCampanha ? "Salvar" : "Criar"}</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {campanhas.map((campanha) => {
            const personagens = mockPersonagens.filter((p) => p.campanhaId === campanha.id)
            const jogadores = mockUsuarios.filter((u) => campanha.jogadorIds.includes(u.id))

            return (
              <Card key={campanha.id} className="overflow-hidden hover:border-primary transition-colors">
                <div className="h-40 overflow-hidden bg-muted">
                  <img
                    src={campanha.imagemUrl || "/placeholder.svg?height=200&width=400"}
                    alt={campanha.nome}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{campanha.nome}</CardTitle>
                      <CardDescription className="mt-2">{campanha.descricao}</CardDescription>
                    </div>
                    {getStatusBadge(campanha.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{jogadores.length} jogadores</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Scroll className="h-4 w-4" />
                      <span>{personagens.length} personagens</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/mestre/campanha/${campanha.id}`} className="flex-1">
                      <Button className="w-full" variant="default">
                        Gerenciar
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon" onClick={() => openEditDialog(campanha)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDeleteCampanha(campanha.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {campanhas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Nenhuma campanha criada ainda.</p>
            <p className="text-muted-foreground">Clique em "Nova Campanha" para começar!</p>
          </div>
        )}
      </div>
    </div>
  )
}
