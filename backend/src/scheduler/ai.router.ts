export function chooseNextSpeaker(message: string): string {
  const text = message.toLowerCase();

  // Finance
  if (
    /\b(cost|budget|profit|revenue|finance|pricing|price|investment|roi|cash|margin)\b/.test(
      text
    )
  ) {
    return "CFO";
  }

  // Marketing
  if (
    /\b(marketing|customer|brand|sales|advertising|promotion|market|growth|competition)\b/.test(
      text
    )
  ) {
    return "CMO";
  }

  // Operations
  if (
    /\b(operation|operations|delivery|factory|production|manufacturing|logistics|supply chain|inventory)\b/.test(
      text
    )
  ) {
    return "COO";
  }

  // Risk
  if (
    /\b(risk|legal|security|compliance|regulation|lawsuit|fraud|privacy|cyber)\b/.test(
      text
    )
  ) {
    return "CRO";
  }

  // Strategy (default)
  return "CEO";
}