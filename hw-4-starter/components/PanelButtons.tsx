import { Button } from "semantic-ui-react"

const PanelButtons = () => {
  // TODO 3: Define props and add functionality to the following four buttons.
  return (
    <Button.Group vertical>
      <Button secondary basic>
        Steal Picture
      </Button>
      <Button secondary basic>
        Steal Title
      </Button>
      <Button secondary basic>
        Steal First Name
      </Button>
      <Button secondary basic>
        Steal Last Name
      </Button>
    </Button.Group>
  )
}

export default PanelButtons
