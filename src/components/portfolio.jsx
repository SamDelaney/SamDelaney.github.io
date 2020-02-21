import React from 'react';
import {Text} from 'office-ui-fabric-react';
import GalleryCard from './gallerycard';
import Logo from '../Logo3.svg'
import WolfgangIcon from '../images/WolfgangIcon.png'
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
      <GalleryCard image={WolfgangIcon} data={Data.wolfgang}/>
      <GalleryCard image={Logo} data={Data.lite} />
  </div>  
);

export default Portfolio;