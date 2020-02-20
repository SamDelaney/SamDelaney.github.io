import React from 'react'
import {Text, Image} from 'office-ui-fabric-react'
import Portrait from '../images/SamPortrait.jpg'
import '../App.css'

class About extends React.Component {
    render() {
        return <div className="about">
            <Image src={Portrait} width={350}/>
            <AboutText />
        </div>
    }
}

const AboutText = () => (
    <div>
        <Text block variant={"xLargePlus"}>About Me</Text>
        <Text block variant={"large"}>4th year student at Trinity Western University, graduating with B.Sc. in Computer Science and B.A. in Applied Linguistics in April 2020. Looking to use my professional experience as a developer and a leader to grow in my abilities, create exciting software, and build working relationships in the field.</Text>
    </div>
);

export default About;