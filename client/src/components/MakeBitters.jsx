import React from 'react';
import Herbs from './Herbs.jsx';
import Recipe from './Recipe.jsx';
import Benefits from './Benefits.jsx';

let currentBenefits = {};
let currentHerbs = {};

class MakeBitters extends React.Component {
  constructor(props) {
    super(props);

    this.getHerbs = this.getHerbs.bind(this);
    this.getBenefits = this.getBenefits.bind(this);
    this.clickedHerb = this.clickedHerb.bind(this);
    this.removeBenefit = this.removeBenefit.bind(this);
    this.addBenefit = this.addBenefit.bind(this);

    this.state = {
        aromatic : {},
        aromaticCount : 0,
        strong : {},
        strongCount : 0,
        benefits : []
    };
  }

  getHerbs() {
      return fetch('http://localhost:5050/herbs')
      .then(response => {
          return response.json();
      })
      .catch((err) => {
          console.log(err)
      })
  }

  getBenefits() {
    return fetch('http://localhost:5050/benefits')
    .then(response => {
        return response.json();
    })
    .catch((err) => {
        console.log(err)
    })
  }

  clickedHerb(e) {
    if(currentHerbs[e.target.name]) {
      let herb = currentHerbs[e.target.name];
      for (let benefit of herb.benefits) {
        this.removeBenefit([parseInt(benefit)]);
      }
      delete currentHerbs[e.target.name];
    }
    else {
      if (this.state.aromatic[e.target.name])
        currentHerbs[e.target.name] = this.state.aromatic[e.target.name];
      else
        currentHerbs[e.target.name] = this.state.strong[e.target.name];
      let herb = currentHerbs[e.target.name];
      for (let benefit of herb.benefits) {
        this.addBenefit([parseInt(benefit)]);
      }
    }
    this.forceUpdate();
  }

  removeBenefit(num) {
    if (currentBenefits[this.state.benefits[num - 1]] === 1)
      delete currentBenefits[this.state.benefits[num - 1]];
    else
      currentBenefits[this.state.benefits[num - 1]] = currentBenefits[this.state.benefits[num - 1]] - 1;
  }

  addBenefit(num) {
    if (currentBenefits[this.state.benefits[num - 1]])
      currentBenefits[this.state.benefits[num - 1]] = currentBenefits[this.state.benefits[num - 1]] + 1;
    else
      currentBenefits[this.state.benefits[num - 1]] = 1;
  }

  strongCount() {
    this.setState({strongCount : this.state.strongCount + 1});
  }

  aromaticCount() {
    this.setState({aromaticCount : this.state.aromaticCount + 1});
  }

  componentDidMount() {
      this.getHerbs()
        .then(data => {
            let aromatic = {};
            let strong = {};
            for (let herb of data) {
              if (herb.type === 'aromatic')
                aromatic[herb.name] = {
                  'benefits' : herb.benefits.split(','),
                }
              else
                strong[herb.name] = {
                  'benefits' : herb.benefits.split(','),
                }
            }
            this.setState({aromatic : aromatic});
            this.setState({strong : strong});
        })
        .catch(() => {
            console.log('could not get herbs')
        });

      this.getBenefits()
        .then(data => {
          let arr = [];
          data.forEach(benefit => {
            arr.push(benefit.type);
          });
          this.setState({benefits : arr})
        })
        .catch(() => {
            console.log('could not get benefits')
        })
  }

  render() {
    if(Object.keys(this.state.aromatic).length > 0 && Object.keys(this.state.strong).length > 0) {
      return (
        <React.Fragment>
          <Recipe herbs={currentHerbs} />
          <Benefits benefits={Object.keys(currentBenefits)} />
          <Herbs herbs={this.state.aromatic} clickedHerb={this.clickedHerb}/>
          <Herbs herbs={this.state.strong} clickedHerb={this.clickedHerb}/>
        </React.Fragment>
      );
    }
    else return(<span></span>)
  }
}

export default MakeBitters;