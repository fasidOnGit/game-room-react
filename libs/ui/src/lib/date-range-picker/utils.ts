export const toDateString = (date: Date) => {
  return date.toLocaleDateString().replace('/', '-').replace('/', '-').replace('/', '-')
}

export const pad = (n: number) => {
  return (n < 10) ? ("0" + n) : n;
}
