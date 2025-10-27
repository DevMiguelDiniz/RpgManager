"use client"

import type React from "react"

import { use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import type { Personagem, Ficha } from "@/lib/types"

export default function NovoNPC({ params }: { params: Promise<{ id: string }> }) {
  const { id: campanhaId } = use(params)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const novaFicha: Ficha = {
      id: `f${Date.now()}`,
      personagemId: `p${Date.now()}`,
      pontosVidaAtual: Number(formData.get("pontosVidaMax")),
      pontosVidaMax: Number(formData.get("pontosVidaMax")),
      sanidadeAtual: Number(formData.get("sanidadeMax")),
      sanidadeMax: Number(formData.get("sanidadeMax")),
      nivel: Number(formData.get("nivel")),
      atributos: {
        forca: Number(formData.get("forca")),
        destreza: Number(formData.get("destreza")),
        constituicao: Number(formData.get("constituicao")),
        inteligencia: Number(formData.get("inteligencia")),
        sabedoria: Number(formData.get("sabedoria")),
        carisma: Number(formData.get("carisma")),
      },
      inventario: [],
      historia: formData.get("historia") as string,
    }

    const novoNPC: Personagem = {
      id: `p${Date.now()}`,
      nome: formData.get("nome") as string,
      tipo: "NPC",
      classe: formData.get("classe") as string,
      raca: formData.get("raca") as string,
      campanhaId,
      ficha: novaFicha,
    }

    console.log("[v0] Novo NPC criado:", novoNPC)
    alert("NPC criado com sucesso!")
    router.push(`/mestre/campanha/${campanhaId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href={`/mestre/campanha/${campanhaId}`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Criar Novo NPC</h1>
              <p className="text-muted-foreground">Adicione um novo personagem não-jogador à campanha</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome do Personagem</Label>
                  <Input id="nome" name="nome" placeholder="Ex: Barão Malachar" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nivel">Nível</Label>
                  <Input id="nivel" name="nivel" type="number" min="1" max="20" defaultValue="1" required />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="raca">Raça</Label>
                  <Input id="raca" name="raca" placeholder="Ex: Humano" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="classe">Classe</Label>
                  <Input id="classe" name="classe" placeholder="Ex: Necromante" required />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Atributos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="forca">Força</Label>
                  <Input id="forca" name="forca" type="number" min="1" max="30" defaultValue="10" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destreza">Destreza</Label>
                  <Input id="destreza" name="destreza" type="number" min="1" max="30" defaultValue="10" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="constituicao">Constituição</Label>
                  <Input
                    id="constituicao"
                    name="constituicao"
                    type="number"
                    min="1"
                    max="30"
                    defaultValue="10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inteligencia">Inteligência</Label>
                  <Input
                    id="inteligencia"
                    name="inteligencia"
                    type="number"
                    min="1"
                    max="30"
                    defaultValue="10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sabedoria">Sabedoria</Label>
                  <Input id="sabedoria" name="sabedoria" type="number" min="1" max="30" defaultValue="10" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carisma">Carisma</Label>
                  <Input id="carisma" name="carisma" type="number" min="1" max="30" defaultValue="10" required />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pontos de Vida e Sanidade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pontosVidaMax">Pontos de Vida Máximos</Label>
                  <Input id="pontosVidaMax" name="pontosVidaMax" type="number" min="1" defaultValue="20" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sanidadeMax">Sanidade Máxima</Label>
                  <Input id="sanidadeMax" name="sanidadeMax" type="number" min="1" defaultValue="100" required />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>História</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="historia">Background do Personagem</Label>
                <Textarea
                  id="historia"
                  name="historia"
                  placeholder="Descreva a história e motivações do NPC..."
                  rows={6}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-end">
            <Link href={`/mestre/campanha/${campanhaId}`}>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </Link>
            <Button type="submit">Criar NPC</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
