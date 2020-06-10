import React from 'react'
import {Text, Image} from 'office-ui-fabric-react'
import Portrait from '../images/SamPortrait.jpg'
import './stylesheets/about.css'

class About extends React.Component {
    render() {
        return <div className="About">
            <Image src={Portrait} width={350}/>
            <AboutText />
        </div>
    }
}

const _aboutParas = ["I am a 22-year-old linguistically educated software developer from Seattle Washington with a B.S. in Computer Science and a B.A. in Applied Linguistics from Trinity Western University in Langley, British Columbia.",
 "Through my internships and the competitions I have attended, I have had the opportunity to reach fluency in a wide range of software development skills related to agile development and project management for a variety of platforms.",
 "In addition to my technical abilities, my experience as a leader has enabled me to develop humility, selflessness, communicative skills and decisive autonomy, qualities which I believe are valuable to any team, in any role.",
 "Please let me know if you're interested in working with me, I'd love to hear from you."
];

const AboutText = () => (
    <div>
        <Text block variant={"xLargePlus"}>About Me</Text>
        {_aboutParas.map(function(text) {
            return <Text block variant={"large"} className="AboutPara">{text}</Text>
        }
        )}
    </div>
);

export default About;