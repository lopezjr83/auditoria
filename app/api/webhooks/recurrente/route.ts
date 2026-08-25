import { NextRequest, NextResponse } from 'next/server'

// Webhook de Recurrente — será configurado cuando se agregue billing
// Por ahora: stub que acepta requests

export async function POST(request: NextRequest) {
  try {
    // Verificar signature
    const signature = request.headers.get('x-recurrente-signature')
    if (!signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const payload = await request.text()
    const event = JSON.parse(payload)

    // event_type puede ser:
    // - subscription.created
    // - subscription.updated
    // - subscription.canceled

    console.log(`[Recurrente Webhook] Event: ${event.event_type}`, event.data)

    // TODO: Cuando BD esté lista, actualizar subscription en Prisma
    // const subscription = await prisma.subscription.update({
    //   where: { recurrenteSubscriptionId: event.data.subscription_id },
    //   data: {
    //     status: event.data.status.toUpperCase(),
    //     currentPeriodEnd: new Date(event.data.current_period_end),
    //   },
    // })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Recurrente webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
