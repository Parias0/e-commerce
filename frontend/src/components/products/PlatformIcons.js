import React from 'react';

const PlatformIcons = ({ platforms }) => {
 
  const defaultIcons = {
    ps5: "PS5.png",
    ps4: "PS4.png",
    ps3: "PS3.png",
    xbox_series_s: "Xbox_Series_S.png",
    xbox_series_x: "Xbox_Series_X.png",
    pc: "PC.png",
    xbox_one: "Xbox_one.png",
    xbox_360: "XBOX_360.png",
    nintento_switch: "Nintendo_switch.png"
  };

  const sortedPlatforms = platforms.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      {sortedPlatforms.map((platform) => {
        const platformKey = platform.name
          .toLowerCase()
          .replace(/\s/g, '_')
          .replace(/[^a-zA-Z0-9_]/g, '');

        const iconSource = defaultIcons[platformKey] || defaultIcons.default;

        return (
          <img
            key={platform.id}
            src={`/images/${iconSource}`}
            alt={platform.name}
            style={{ width: '40px', height: '40px', marginRight: '10px', borderRadius: '50%' }}
          />
        );
      })}
    </>
  );
};

export default PlatformIcons;
