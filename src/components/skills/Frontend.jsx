import React from 'react'

const frontendSkillGroups = [
  [
    { name: 'HTML', level: 'Intermediate' },
    { name: 'CSS', level: 'Intermediate' },
    { name: 'JavaScript', level: 'Intermediate' },
  ],
  [
    { name: 'Bootstrap', level: 'Basic' },
    { name: 'Git', level: 'Intermediate' },
    { name: 'React', level: 'Basic' },
  ],
];

const Frontend = () => {
  return (
    <div className="skills__content">
        <h3 className="skills__title">Frontend development</h3>

        <div className="skills__box">
            {frontendSkillGroups.map((skillGroup, groupIndex) => (
                <div className="skills__group" key={`frontend-group-${groupIndex}`}>
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

export default Frontend