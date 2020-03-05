import React from 'react';
import {Text} from 'office-ui-fabric-react';
import GalleryCard from './gallerycard';
import Data from './portfoliodata.json'


class Portfolio extends React.Component {
    render() {
        return <div className="Portfolio"> 
            <Text block variant={"xLargePlus"}>Portfolio</Text>
            <Gallery />
        </div>
    }
}

const Gallery = () => (
  <div className="Gallery">
      <GalleryCard data={Data.samdelaney_tech} />
      <GalleryCard data={Data.wolfgang} />
      <GalleryCard data={Data.clarifeye} />
      <GalleryCard data={Data.thecombine} />
      <GalleryCard data={Data.lite} />
      <GalleryCard data={Data.fieldworks}/>
  </div>  
);

export default Portfolio;