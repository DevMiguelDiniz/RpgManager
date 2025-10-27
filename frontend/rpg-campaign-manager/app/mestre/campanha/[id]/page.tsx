"use client"

import { use, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Plus, Users, Skull } from "lucide-react"
import { mockCampanhas, mockPersonagens, mockUsuarios } from "@/lib/mock-data"
import type { Personagem } from "@/lib/types"

export default function CampanhaDetalhes({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const campanha = mockCampanhas.find((c) => c.id === id)
  const [personagens] = useState<Personagem[]>(mockPersonagens.filter((p) => p.campanhaId === id))

  if (!campanha) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Campanha não encontrada</h1>
          <Link href="/mestre">
            <Button className="mt-4">Voltar ao Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  const pcs = personagens.filter((p) => p.tipo === "PC")
  const npcs = personagens.filter((p) => p.tipo === "NPC")
  const jogadores = mockUsuarios.filter((u) => campanha.jogadorIds.includes(u.id))

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/mestre">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground">{campanha.nome}</h1>
              <p className="text-muted-foreground">{campanha.descricao}</p>
            </div>
            <Badge>{campanha.status}</Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="pcs" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pcs">
              <Users className="mr-2 h-4 w-4" />
              Personagens dos Jogadores ({pcs.length})
            </TabsTrigger>
            <TabsTrigger value="npcs">
              <Skull className="mr-2 h-4 w-4" />
              NPCs ({npcs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pcs" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pcs.map((personagem) => {
                const jogador = mockUsuarios.find((u) => u.id === personagem.jogadorId)
                return (
                  <Card key={personagem.id} className="hover:border-primary transition-colors">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-muted overflow-hidden flex-shrink-0">
                          <img
                            src={personagem.avatarUrl || "/placeholder.svg?height=64&width=64"}
                            alt={personagem.nome}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg truncate">{personagem.nome}</CardTitle>
                          <CardDescription>
                            {personagem.raca} {personagem.classe}
                          </CardDescription>
                          <p className="text-sm text-muted-foreground mt-1">Jogador: {jogador?.nome}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Nível:</span>
                          <span className="font-medium">{personagem.ficha.nivel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">HP:</span>
                          <span className="font-medium">
                            {personagem.ficha.pontosVidaAtual}/{personagem.ficha.pontosVidaMax}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sanidade:</span>
                          <span className="font-medium">
                            {personagem.ficha.sanidadeAtual}/{personagem.ficha.sanidadeMax}
                          </span>
                        </div>
                      </div>
                      <Link href={`/mestre/personagem/${personagem.id}`}>
                        <Button className="w-full mt-4 bg-transparent" variant="outline">
                          Ver Ficha Completa
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            {pcs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum personagem de jogador nesta campanha ainda.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="npcs" className="space-y-6">
            <div className="flex justify-end">
              <Link href={`/mestre/campanha/${id}/novo-npc`}>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Criar NPC
                </Button>
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {npcs.map((personagem) => (
                <Card key={personagem.id} className="hover:border-primary transition-colors">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-muted overflow-hidden flex-shrink-0">
                        <img
                          src={personagem.avatarUrl || "/placeholder.svg?height=64&width=64"}
                          alt={personagem.nome}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg truncate">{personagem.nome}</CardTitle>
                        <CardDescription>
                          {personagem.raca} {personagem.classe}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nível:</span>
                        <span className="font-medium">{personagem.ficha.nivel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">HP:</span>
                        <span className="font-medium">
                          {personagem.ficha.pontosVidaAtual}/{personagem.ficha.pontosVidaMax}
                        </span>
                      </div>
                    </div>
                    <Link href={`/mestre/personagem/${personagem.id}`}>
                      <Button className="w-full mt-4 bg-transparent" variant="outline">
                        Ver/Editar Ficha
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            {npcs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum NPC criado ainda.</p>
                <p className="text-muted-foreground">Clique em "Criar NPC" para adicionar personagens à campanha!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
