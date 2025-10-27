"use client"

import type React from "react"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react"
import { mockPersonagens } from "@/lib/mock-data"
import type { Personagem, Item } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function PersonagemDetalhes({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const personagemOriginal = mockPersonagens.find((p) => p.id === id)

  const [personagem, setPersonagem] = useState<Personagem | undefined>(personagemOriginal)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  if (!personagem) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Personagem não encontrado</h1>
          <Link href="/mestre">
            <Button className="mt-4">Voltar ao Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  const isNPC = personagem.tipo === "NPC"

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
              <Link href={`/mestre/campanha/${personagem.campanhaId}`}>
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
            <div className="flex items-center gap-2">
              <Badge variant={isNPC ? "secondary" : "default"}>{isNPC ? "NPC" : "PC"}</Badge>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Pontos de Vida e Sanidade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pontosVidaAtual">Pontos de Vida Atual</Label>
                <Input
                  id="pontosVidaAtual"
                  type="number"
                  value={personagem.ficha.pontosVidaAtual}
                  onChange={(e) =>
                    setPersonagem({
                      ...personagem,
                      ficha: { ...personagem.ficha, pontosVidaAtual: Number(e.target.value) },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pontosVidaMax">Pontos de Vida Máximos</Label>
                <Input
                  id="pontosVidaMax"
                  type="number"
                  value={personagem.ficha.pontosVidaMax}
                  onChange={(e) =>
                    setPersonagem({
                      ...personagem,
                      ficha: { ...personagem.ficha, pontosVidaMax: Number(e.target.value) },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sanidadeAtual">Sanidade Atual</Label>
                <Input
                  id="sanidadeAtual"
                  type="number"
                  value={personagem.ficha.sanidadeAtual}
                  onChange={(e) =>
                    setPersonagem({
                      ...personagem,
                      ficha: { ...personagem.ficha, sanidadeAtual: Number(e.target.value) },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sanidadeMax">Sanidade Máxima</Label>
                <Input
                  id="sanidadeMax"
                  type="number"
                  value={personagem.ficha.sanidadeMax}
                  onChange={(e) =>
                    setPersonagem({
                      ...personagem,
                      ficha: { ...personagem.ficha, sanidadeMax: Number(e.target.value) },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Atributos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="forca">Força</Label>
                  <Input
                    id="forca"
                    type="number"
                    value={personagem.ficha.atributos.forca}
                    onChange={(e) =>
                      setPersonagem({
                        ...personagem,
                        ficha: {
                          ...personagem.ficha,
                          atributos: { ...personagem.ficha.atributos, forca: Number(e.target.value) },
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destreza">Destreza</Label>
                  <Input
                    id="destreza"
                    type="number"
                    value={personagem.ficha.atributos.destreza}
                    onChange={(e) =>
                      setPersonagem({
                        ...personagem,
                        ficha: {
                          ...personagem.ficha,
                          atributos: { ...personagem.ficha.atributos, destreza: Number(e.target.value) },
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="constituicao">Constituição</Label>
                  <Input
                    id="constituicao"
                    type="number"
                    value={personagem.ficha.atributos.constituicao}
                    onChange={(e) =>
                      setPersonagem({
                        ...personagem,
                        ficha: {
                          ...personagem.ficha,
                          atributos: { ...personagem.ficha.atributos, constituicao: Number(e.target.value) },
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inteligencia">Inteligência</Label>
                  <Input
                    id="inteligencia"
                    type="number"
                    value={personagem.ficha.atributos.inteligencia}
                    onChange={(e) =>
                      setPersonagem({
                        ...personagem,
                        ficha: {
                          ...personagem.ficha,
                          atributos: { ...personagem.ficha.atributos, inteligencia: Number(e.target.value) },
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sabedoria">Sabedoria</Label>
                  <Input
                    id="sabedoria"
                    type="number"
                    value={personagem.ficha.atributos.sabedoria}
                    onChange={(e) =>
                      setPersonagem({
                        ...personagem,
                        ficha: {
                          ...personagem.ficha,
                          atributos: { ...personagem.ficha.atributos, sabedoria: Number(e.target.value) },
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carisma">Carisma</Label>
                  <Input
                    id="carisma"
                    type="number"
                    value={personagem.ficha.atributos.carisma}
                    onChange={(e) =>
                      setPersonagem({
                        ...personagem,
                        ficha: {
                          ...personagem.ficha,
                          atributos: { ...personagem.ficha.atributos, carisma: Number(e.target.value) },
                        },
                      })
                    }
                  />
                </div>
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
              <CardTitle>História</CardTitle>
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
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
