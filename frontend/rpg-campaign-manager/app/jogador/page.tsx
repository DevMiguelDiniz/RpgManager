"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Scroll } from "lucide-react"
import { getCampanhasByJogador, getPersonagemByJogador, mockUsuarios } from "@/lib/mock-data"
import type { Campanha } from "@/lib/types"

export default function JogadorDashboard() {
  const jogadorId = "u2" // Mock logged in player
  const jogador = mockUsuarios.find((u) => u.id === jogadorId)
  const [campanhas] = useState<Campanha[]>(getCampanhasByJogador(jogadorId))

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Área do Jogador</h1>
              <p className="text-muted-foreground">Bem-vindo, {jogador?.nome}!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Minhas Campanhas</h2>
          <p className="text-muted-foreground">Campanhas das quais você participa</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {campanhas.map((campanha) => {
            const meuPersonagem = getPersonagemByJogador(jogadorId, campanha.id)
            const mestre = mockUsuarios.find((u) => u.id === campanha.mestreId)

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
                    <Badge>{campanha.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>Mestre: {mestre?.nome}</span>
                    </div>
                    {meuPersonagem && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Scroll className="h-4 w-4" />
                        <span>Seu personagem: {meuPersonagem.nome}</span>
                      </div>
                    )}
                  </div>
                  {meuPersonagem ? (
                    <Link href={`/jogador/personagem/${meuPersonagem.id}`}>
                      <Button className="w-full">Ver Minha Ficha</Button>
                    </Link>
                  ) : (
                    <Button className="w-full bg-transparent" variant="outline" disabled>
                      Sem Personagem
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {campanhas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Você ainda não está participando de nenhuma campanha.</p>
            <p className="text-muted-foreground">Aguarde o convite do seu Mestre!</p>
          </div>
        )}
      </div>
    </div>
  )
}
