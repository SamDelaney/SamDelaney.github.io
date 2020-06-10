import React from 'react';
import {Text} from 'office-ui-fabric-react';
import GalleryCard from './gallerycard';
import Data from './portfoliodata.json'


class Portfolio extends React.Component {
    portfolioHeaderStyles = {
        root: {
            margin: 10,
            marginLeft: 40
        }
    }

    gallery = () => (
        <div className="Gallery">
            <GalleryCard data={Data.samdelaney_tech} theme={this.props.theme}/>
            <GalleryCard data={Data.wolfgang} theme={this.props.theme}/>
            <GalleryCard data={Data.clarifeye} theme={this.props.theme}/>
            <GalleryCard data={Data.thecombine} theme={this.props.theme}/>
            <GalleryCard data={Data.lite} theme={this.props.theme}/>
            <GalleryCard data={Data.fieldworks} theme={this.props.theme}/>
        </div>  
      ); 

    render() {
        return <div className="DefaultComponentWrapper"> 
            <Text block variant={"xLargePlus"} styles={this.portfolioHeaderStyles}>My Work</Text>
            <this.gallery />
        </div>
    }
}



export default Portfolio;