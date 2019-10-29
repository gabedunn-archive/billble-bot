export const messageToGroff = messages => {
  return messages.map(m => `\n.LP\n${m.date} -- ${m.content}`).join('\n.ls 2')
}
