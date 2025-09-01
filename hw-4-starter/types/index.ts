export type RandomUserAPIResponse = {
  results: UserData[]
}

export type UserData = {
  name: {
    title: string
    first: string
    last: string
  }
  picture: {
    large: string
  }
}
