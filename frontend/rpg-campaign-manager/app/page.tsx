import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sword, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-foreground">Sistema de Gerenciamento de RPG</h1>
          <p className="text-xl text-muted-foreground">Gerencie suas campanhas, personagens e aventuras épicas</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Sword className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Área do Mestre</CardTitle>
              <CardDescription>Crie e gerencie campanhas, NPCs e acompanhe o progresso dos jogadores</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/mestre">
                <Button className="w-full" size="lg">
                  Entrar como Mestre
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Área do Jogador</CardTitle>
              <CardDescription>Visualize suas campanhas e gerencie sua ficha de personagem</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/jogador">
                <Button className="w-full bg-transparent" size="lg" variant="outline">
                  Entrar como Jogador
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
