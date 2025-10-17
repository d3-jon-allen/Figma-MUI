export async function fetchFigmaNode(fileKey: string, nodeId: string, token: string) {
  const url = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}`
  const res = await fetch(url, { headers: { 'X-Figma-Token': token } })
  if (!res.ok) throw new Error(`Figma ${res.status}`)
  return res.json()
}

export function mapNodeToLessSimpleProps(node: any) {
  const nodes = node?.nodes || {}
  const firstKey = Object.keys(nodes)[0]
  const doc = (firstKey && nodes[firstKey]?.document) || {}
  const cp = (doc as any).componentProperties || {}

  const getStr = (k: string): string | undefined => {
    const v = cp[k]?.value
    return typeof v === 'string' ? (v.trim() || undefined) : undefined
  }

  const chips = [getStr('chip1'), getStr('chip2'), getStr('chip3')].filter(Boolean) as string[]
  const elevationStr = getStr('elevation')
  const elevation = elevationStr ? Number(elevationStr) : undefined

  return {
    title: getStr('title'),
    subtitle: getStr('subtitle'),
    content: getStr('content'),
    chips,
    buttonLabel: getStr('buttonLabel'),
    buttonVariant: (getStr('buttonVariant') as any) || undefined,
    buttonColor: (getStr('buttonColor') as any) || undefined,
    elevation,
  }
}


