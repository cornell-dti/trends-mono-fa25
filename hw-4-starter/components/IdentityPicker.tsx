import { useEffect, useState } from "react"
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Segment,
} from "semantic-ui-react"
import { UserData, RandomUserAPIResponse } from "../types"
import PanelButtons from "./PanelButtons"
import UserDisplay from "./UserDisplay"

const IdentityPicker = () => {
  const [myUser, setMyUser] = useState<UserData | null>(null)
  const [fetchedUser, setFetchedUser] = useState<UserData | null>(null)

  // TODO 1: Implement this function to fetch the API and return user data.
  const fetchRandomUser = (): Promise<UserData> => {
    throw new Error("Not implemented yet.")
  }

  // TODO 2: Invoke `fetchRandomUser` on page load and "Refresh" click

  const summarizeUser = (user: UserData) => {
    if (!user) return "Hello!"
    const { title, first, last } = user.name
    return `Hello, I am ${title} ${first} ${last}.`
  }

  return (
    <Container textAlign="center" style={{ marginTop: "3em" }}>
      <Header as="h1">
        Identity Picker
        <Header.Subheader>{summarizeUser(myUser)}</Header.Subheader>
      </Header>
      <Divider />
      <Grid container columns={3} relaxed stackable>
        <Grid.Column>
          <UserDisplay header="Me" user={myUser} />
        </Grid.Column>
        <Grid.Column>
          <Button color="green" attached="top">
            Refresh
          </Button>
          <Header as="h2" attached content="Control Panel" />
          <Segment attached="bottom">
            {myUser && fetchedUser && (
              <PanelButtons />
            )}
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <UserDisplay header="Fetched User" user={fetchedUser} />
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default IdentityPicker
