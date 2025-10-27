"use client"

import type React from "react"

import { use, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Plus, Trash2, Lock } from "lucide-react"
import { mockPersonagens } from "@/lib/mock-data"
import type { Personagem, Item } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function JogadorPersonagemDetalhes({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const personagemOriginal = mockPersonagens.find((p) => p.id === id)

  const [personagem, setPersonagem] = useState<Personagem | undefined>(personagemOriginal)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  if (!personagem) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Personagem não encontrado</h1>
          <Link href="/jogador">
            <Button className="mt-4">Voltar ao Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleSave = () => {
    console.log("[v0] Personagem salvo:", personagem)
    alert("Alterações salvas com sucesso!")
  }

  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const novoItem: Item = {
      id: `i${Date.now()}`,
      nome: formData.get("nome") as string,
      descricao: formData.get("descricao") as string,
      quantidade: Number(formData.get("quantidade")),
    }

    setPersonagem({
      ...personagem,
      ficha: {
        ...personagem.ficha,
        inventario: [...personagem.ficha.inventario, novoItem],
      },
    })

    setIsDialogOpen(false)
    e.currentTarget.reset()
  }

  const handleRemoveItem = (itemId: string) => {
    setPersonagem({
      ...personagem,
      ficha: {
        ...personagem.ficha,
        inventario: personagem.ficha.inventario.filter((i) => i.id !== itemId),
      },
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/jogador">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-muted overflow-hidden">
                  <img
                    src={personagem.avatarUrl || "/placeholder.svg?height=64&width=64"}
                    alt={personagem.nome}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{personagem.nome}</h1>
                  <p className="text-muted-foreground">
                    {personagem.raca} {personagem.classe} - Nível {personagem.ficha.nivel}
                  </p>
                </div>
              </div>
            </div>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Pontos de Vida e Sanidade</CardTitle>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  Somente Leitura
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Pontos de Vida Atual</Label>
                <div className="text-2xl font-bold text-foreground">{personagem.ficha.pontosVidaAtual}</div>
              </div>
              <div className="space-y-2">
                <Label>Pontos de Vida Máximos</Label>
                <div className="text-2xl font-bold text-foreground">{personagem.ficha.pontosVidaMax}</div>
              </div>
              <div className="space-y-2">
                <Label>Sanidade Atual</Label>
                <div className="text-2xl font-bold text-foreground">{personagem.ficha.sanidadeAtual}</div>
              </div>
              <div className="space-y-2">
                <Label>Sanidade Máxima</Label>
                <div className="text-2xl font-bold text-foreground">{personagem.ficha.sanidadeMax}</div>
              </div>
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Apenas o Mestre pode alterar seus pontos de vida e sanidade durante a sessão.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Atributos</CardTitle>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  Somente Leitura
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Força</Label>
                  <div className="text-2xl font-bold text-foreground">{personagem.ficha.atributos.forca}</div>
                </div>
                <div className="space-y-2">
                  <Label>Destreza</Label>
                  <div className="text-2xl font-bold text-foreground">{personagem.ficha.atributos.destreza}</div>
                </div>
                <div className="space-y-2">
                  <Label>Constituição</Label>
                  <div className="text-2xl font-bold text-foreground">{personagem.ficha.atributos.constituicao}</div>
                </div>
                <div className="space-y-2">
                  <Label>Inteligência</Label>
                  <div className="text-2xl font-bold text-foreground">{personagem.ficha.atributos.inteligencia}</div>
                </div>
                <div className="space-y-2">
                  <Label>Sabedoria</Label>
                  <div className="text-2xl font-bold text-foreground">{personagem.ficha.atributos.sabedoria}</div>
                </div>
                <div className="space-y-2">
                  <Label>Carisma</Label>
                  <div className="text-2xl font-bold text-foreground">{personagem.ficha.atributos.carisma}</div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Os atributos são definidos pelo Mestre e não podem ser alterados diretamente.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Inventário</CardTitle>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adicionar Item ao Inventário</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddItem} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome do Item</Label>
                        <Input id="nome" name="nome" placeholder="Ex: Espada Longa" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="descricao">Descrição</Label>
                        <Textarea id="descricao" name="descricao" placeholder="Descreva o item..." rows={3} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quantidade">Quantidade</Label>
                        <Input id="quantidade" name="quantidade" type="number" min="1" defaultValue="1" required />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button type="submit">Adicionar</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {personagem.ficha.inventario.map((item) => (
                  <div key={item.id} className="flex items-start justify-between p-3 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground">{item.nome}</h4>
                        <Badge variant="secondary">x{item.quantidade}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.descricao}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {personagem.ficha.inventario.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">Nenhum item no inventário</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>História do Personagem</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={personagem.ficha.historia}
                onChange={(e) =>
                  setPersonagem({
                    ...personagem,
                    ficha: { ...personagem.ficha, historia: e.target.value },
                  })
                }
                rows={8}
                className="resize-none"
                placeholder="Escreva a história do seu personagem..."
              />
              <p className="text-sm text-muted-foreground mt-2">
                Você pode editar a história do seu personagem a qualquer momento.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
