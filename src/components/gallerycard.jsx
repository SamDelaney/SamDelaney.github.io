import React from 'react';
import {Text, Image, OverflowSet, Link} from 'office-ui-fabric-react';
import {Card} from '@uifabric/react-cards';

class GalleryCard extends React.Component {
    
    galleryStyles = {
        root: {
            margin: 10,
            padding: 10
        }
    }

    onClicked = () => {
        alert(this.props.data.title + ' card clicked');
    };

    render() {
        return <Card onClick={this.onClicked} styles={this.galleryStyles}>
            <Text variant="large" >
                    {this.props.data.title}
            </Text>

            <Image src={this.props.image} maxwidth={250} height={250}/>

            <Card.Section> 
                <Text variant="small">
                    {this.props.data.date}
                </Text>
                <Text variant="small">
                    {this.props.data.desc}
                </Text>
                <OverflowSet items={this.props.data.keys} onRenderItem={this._onRenderItem}/>
            </Card.Section>
        </Card>
    }

    _onRenderItem = (item) => {
        return (
        <div className="GalleryKey">
          <Text variant={"xSmall"}>
            {item}
          </Text>
        </div>
        );
    };
}



export default GalleryCard;