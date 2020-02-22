import React from 'react';
import {Text, Image, OverflowSet, Modal} from 'office-ui-fabric-react';
import {Card} from '@uifabric/react-cards';

var images = require.context("../images", true)

class GalleryCard extends React.Component {
    state = {
        showModal: false
    }

    galleryStyles = {
        root: {
            margin: 10,
            padding: 10
        }
    }

    onClicked = () => {
        this._openModal();
    };

    render() {
        return <> 
        <Card onClick={this.onClicked} styles={this.galleryStyles}>
            <Card.Item>
                <Text variant="large" >
                    {this.props.data.title}
                </Text>
            </Card.Item>

            <Card.Item>
                <Image src={images(this.props.data.imagepaths[0])} maxwidth={250} height={250}/>
            </Card.Item>
            
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

        <Modal isOpen={this.state.showModal} onDismiss={this._closeModal} className="GalleryModal">
            <div>
                <Text variant={"xxLargePlus"}>{this.props.data.title}</Text>
                <OverflowSet items={this.props.data.imagepaths} onRenderItem={this._onRenderImage}/>
                <Text block variant={"large"}>{this.props.data.desc}</Text>
                <Text block variant={"xLarge"}>Relevant Skills</Text>
                <OverflowSet vertical items= {this.props.data.keys} onRenderItem={this._onRenderModalKey}/>
            </div>
        </Modal>
        </>
    }

    _closeModal = () => {
        this.setState({showModal: false});
    }

    _openModal = () => {
        this.setState({showModal: true});
    }

    _onRenderImage = (image) => {
        var imageRef = images(image)
        return (
            <Image src={imageRef} height={450}/>
        )
    }

    _onRenderModalKey = (key) => {
        return (
            <Text variant={'large'}>{"- " + key}</Text>
        )
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