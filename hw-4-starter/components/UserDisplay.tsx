import Image from "next/image"
import { Container, Header, Segment, Table } from "semantic-ui-react"
import { UserData } from "../types"

type Props = {
  header: string
  user: UserData | null
}

const UserDisplay = ({ header, user }: Props) => {
  if (!user) return <p>Hold on, fetching...</p>
  const { name, picture } = user
  const { title, first, last } = name
  const { large: imageLink } = picture

  return (
    <>
      <Header as="h2" attached="top" content={header} block />
      <Segment attached="bottom">
        <Container>
          <Image
            src={imageLink}
            width={128}
            height={128}
            alt="image of person"
          />
          <Table celled striped>
            <Table.Body>
              <Table.Row>
                <Table.Cell collapsing>Title</Table.Cell>
                <Table.Cell>{title}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell collapsing>First Name</Table.Cell>
                <Table.Cell>{first}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell collapsing>Last Name</Table.Cell>
                <Table.Cell>{last}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>
      </Segment>
    </>
  )
}

export default UserDisplay
