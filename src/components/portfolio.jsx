import React from 'react';

//ui libraries
import {Text, Image} from 'office-ui-fabric-react';

//custom imports
import GalleryCard from './gallerycard';

//additional files
import Logo from '../images/Logo3.svg';
import Data from './portfoliodata.json'
import './stylesheets/portfolio.css'

class Portfolio extends React.Component {
    //inlined to avoid margin collapse
    portfolioHeaderStyles = {
        root: {
            margin: 10,
            marginLeft: 40
        }
    }

    work = () => (
        <div className="Gallery">
            <GalleryCard data={Data.grabbit} theme={this.props.theme}/>
            <GalleryCard data={Data.paratext} theme={this.props.theme}/>
            <GalleryCard data={Data.thecombine} theme={this.props.theme}/>
            <GalleryCard data={Data.fieldworks} theme={this.props.theme}/>
        </div>  
      ); 
      projects = () => (
        <div className="Gallery">
            <GalleryCard data={Data.pwmb} theme={this.props.theme}/>
            <GalleryCard data={Data.reflex} theme={this.props.theme}/>
            <GalleryCard data={Data.samdelaney_tech} theme={this.props.theme}/>
            <GalleryCard data={Data.wolfgang} theme={this.props.theme}/>
            {/* <GalleryCard data={Data.clarifeye} theme={this.props.theme}/>
            <GalleryCard data={Data.lite} theme={this.props.theme}/> */}
        </div>  
      ); 

    render() {
        return <div className="DefaultComponentWrapper"> 
            <Text block variant={"xLargePlus"} styles={this.portfolioHeaderStyles}>Professional Work</Text>
            <this.work />
            <Image src={Logo} width={75} className="Rolling-Logo"/>
            <Text block variant={"xLargePlus"} styles={this.portfolioHeaderStyles}>My Projects</Text>
            <this.projects />
            <Image src={Logo} width={75} className="Bouncing-Logo"/>
        </div>
    }
}

export default Portfolio;