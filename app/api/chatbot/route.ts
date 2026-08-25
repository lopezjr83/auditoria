import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { searchFAQs, getKnowledgeDocs } from '@/lib/mock-db'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { message } = await request.json()

    // Nivel 1: FAQ hardcodeado (exact match)
    const faqs = searchFAQs(message)
    if (faqs.length > 0) {
      return NextResponse.json({
        level: 1,
        response: faqs[0].answer,
        source: 'FAQ',
      })
    }

    // Nivel 2: Fuzzy match en keywords
    const keywords = message.toLowerCase().split(' ')
    const docs = getKnowledgeDocs().filter(d =>
      d.tags.some(tag => keywords.some(kw => tag.includes(kw)))
    )

    if (docs.length > 0) {
      return NextResponse.json({
        level: 2,
        response: docs[0].content,
        source: 'Knowledge Base',
      })
    }

    // Nivel 3: Respuesta por defecto
    return NextResponse.json({
      level: 3,
      response: `No encontré información específica sobre "${message}". Por favor consulta la documentación de auditorías o contacta al equipo de soporte.`,
      source: 'Default',
    })
  } catch (error) {
    console.error('Chatbot error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
