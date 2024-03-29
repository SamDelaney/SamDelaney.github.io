import React from 'react'

//ui libraries
import {Text, Image} from 'office-ui-fabric-react'

//additional files
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

function calculateAge(birthday) { // birthday is a date
  var ageDifMs = Date.now() - birthday;
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const age = calculateAge(new Date(1997, 9, 3))

const _aboutParas = ["I am a " + age + "-year-old linguistically educated software engineer from Seattle Washington with a B.S. in Computer Science and a B.A. in Applied Linguistics from Trinity Western University in Langley, British Columbia.",
 "Programming is both my profession and my passion, so I have had the opportunity to reach fluency in a wide range of software development skills for many types of applications on a variety of platforms.",
 "In addition to my technical abilities, my experience as a leader has enabled me to develop ideal team qualities: selflessness, communicative skills and decisive autonomy. I believe I can prove myself valuable to any team, in any role.",
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