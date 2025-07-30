import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <html>
      <head></head>

      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-lg">
            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur-sm">
              <CardHeader className="space-y-6 text-center">
                {/* Animated 404 with Badge */}
                <div className="relative flex flex-col items-center space-y-4">
                  <Badge variant="destructive" className="text-sm font-medium">
                    ERROR
                  </Badge>
                  <div className="relative">
                    <h1 className="animate-pulse text-8xl font-black text-slate-800 sm:text-9xl">
                      404
                    </h1>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-8xl font-black text-transparent opacity-20 sm:text-9xl">
                      404
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <CardTitle className="text-2xl font-bold text-slate-700 sm:text-3xl">
                  Oops! Page Not Found
                </CardTitle>
                <CardDescription className="text-lg leading-relaxed text-slate-600">
                  The page you&apos;re looking for seems to have wandered off into
                  the digital void. Don&apos;t worry, let&apos;s get you back on track!
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    This could happen if the URL was mistyped, the page was
                    moved, or you followed a broken link.
                  </AlertDescription>
                </Alert>

                <Separator />

                {/* Action buttons */}
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Link href="/">
                    <Button className="w-full sm:w-auto" size="lg">
                      <Home className="mr-2 h-4 w-4" />
                      Go Home
                    </Button>
                  </Link>
                  {/* <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={() => window.history.back()}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go Back
                  </Button> */}
                </div>

                {/* Decorative elements */}
                <div className="flex justify-center space-x-2 pt-4">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400"></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </body>
    </html>
  )
}
