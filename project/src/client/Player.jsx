import React from 'react';

const player = window.vimond.player;
const query = player.getQueryParametersAsObject();
// const itemId = query.itemId;
// const startPosition = query.startPosition;

const replacements = [{
  match: /("avc1\.4d001f")+/g,
  replacement: '"avc1.4d401f"'
}, {
  match: /("avc1\.42001e")+/g,
  replacement: '"avc1.42801e"'
}, {
  match: /<Representation id="p0a1r1"(.|\n)*?<\/Representation>/m,
  replacement: ' '
}];

// if (query && query.audiocodec) {
//     replacements.push({
//         match: /("mp4a\.40\.2")+/g,
//         replacement: '"mp4a.40.5"'
//     });
// }

const config = {
  videoEngine: {
    dash: {
      manifestModifier: {
        replacements
      }
    }
  },
  rest: {
    apiServer: '',
  },
  logging: {
    global: 'DEBUG'
  },
  userInactivityInterval: 2000
};

const dependencies = {};

class Player extends React.Component {

  static propTypes = {
    assetId: React.PropTypes.number
  };

  componentDidMount() {
    if (window.vimond.player) {
      const assetId = this.props.assetId || query.assetId || 1072795;

      player.insert({
        autoplay: false,
        assetId
      },
        {
          mainContainer: this.playerContainer,
          // videoElement: "videoElement"
        },
      config,
      dependencies)
              .done(playerApi => {
                window.playerApi = playerApi;
              }, err => {
                console.error('Player insert failed.', err);
              });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.assetId && nextProps.assetId !== this.props.assetId) {
      
    }
  }

  render() {
    return (
      <div className="playerContainer" ref={c => { this.playerContainer = c; }}/>
    );
  }

}

export default Player;
