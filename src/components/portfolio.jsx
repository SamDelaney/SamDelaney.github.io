import React from 'react';
import {Text} from 'office-ui-fabric-react';
import GalleryCard from './gallerycard';
import Data from './portfoliodata.json'


class Portfolio extends React.Component {
    render() {
        return <div> 
            <Text block variant={"xLargePlus"}>Portfolio</Text>
            <Gallery />
        </div>
    }
}

const Gallery = () => (
  <div className="Gallery">
      <GalleryCard data={Data.wolfgang}/>
      <GalleryCard data={Data.lite} />
  </div>  
);

export default Portfolio;