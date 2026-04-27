import React from 'react'

const backendSkillGroups = [
  [
    { name: 'PHP', level: 'Basic' },
    { name: 'Node JS', level: 'Basic' },
    { name: 'Python', level: 'Intermediate' },
  ],
  [
    { name: 'MySQL', level: 'Basic' },
    { name: 'Firebase', level: 'Basic' },
    { name: 'Java', level: 'Intermediate' },
  ],
];

const Backend = () => {
  return (
    <div className="skills__content">
        <h3 className="skills__title">Backend development</h3>

        <div className="skills__box">
            {backendSkillGroups.map((skillGroup, groupIndex) => (
                <div className="skills__group" key={`backend-group-${groupIndex}`}>
                    {skillGroup.map((skill) => (
                        <div className="skills__data" key={skill.name}>
                            <i className="bx bx-badge-check"></i>

                            <div>
                                <h3 className="skills__name">{skill.name}</h3>
                                <span className="skills__level">{skill.level}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </div>
  )
}

export default Backend