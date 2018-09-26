import React from 'react';
import axios from 'axios';
import {
  Card,
  Container,
  Divider,
  Item,
  Grid,
  Image,
  Segment,
  Label,
} from 'semantic-ui-react';



class Games extends React.Component {
  state = { breweries: [] };

  componentDidMount = () => {
    axios.get('https://bgg-json.azurewebsites.net/hot').then((res) => {
      const { entries } = res.data;
      this.setState({
        breweries: entries,
      })
    })
  }

  hasImage = (game) => {
    if (game.hasOwnProperty('images') === true) {
      return <Item.Image src={game.images.medium} />;
    } else {
      return (
        <Item.Image src="https://www.landmarkbangkok.com/images/dining/Huntsman-1.jpg"
        />
      );
    }
  };


  listGames = () => {
     const { breweries } = this.state;
     return breweries.map((game) => (
       <Segment inverted>
         <Item.Group>
          <Item>
            {this.hasImage(game)}
            <Item.Content>
              <Item.Header style={styles.header}>{game.name}</Item.Header>
              <Item.Meta style={styles.header}>Description</Item.Meta>
              <Item.Description style={styles.header}>
                {game.description}
              </Item.Description>
              <Item.Extra style={styles.header}>Additional Details</Item.Extra>
                {game.website}
            </Item.Content>
          </Item>
        </Item.Group>
       </Segment>
     ))
   }

  render() {
    return (
      <div>
        <Image src='https://media.timeout.com/images/102150069/image.jpg' fluid />
        <Container>
          {this.listGames()}
        </Container>
      </div>
    )
  }
}

const styles = {
  header: {
    color: 'white'
  }
}

export default Games;
