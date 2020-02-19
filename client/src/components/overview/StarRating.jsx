import React from 'react';
import StarRatingComponent from 'react-star-rating-component'
// returns undefined if there is no rating

class StarRating extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clickable: (this.props.clickable ? true : false),
      stars: null
    }
    this.starTypes = this.calcStarTypes(this.props.rating)
  }

  componentDidMount() {
    let stars = this.calcStarTypes(this.props.rating)
    this.setState({ stars: stars })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.rating !== this.props.rating) {
      let stars = this.calcStarTypes(this.props.rating)
      this.setState({ stars: stars })
    }
  }

  calcStarTypes(rating) {
    if (rating === undefined) { return }
    let star_filled = Math.floor(rating);
    let star_0quarter = 5 - Math.ceil(rating)
    let quarter;
    if (star_filled + star_0quarter < 5 ) {
      quarter = Math.floor((rating - star_filled) * 4);
    }
    let stars = [];
    // add filled stars
    for (let i = 0; i < star_filled; i++) { stars.push('star_filled') }
    // add quarter stars
    if (quarter !== undefined) { stars.push(`star_${quarter}quarter`) }
    // add empty stars
    for (let i = 0; i < star_0quarter; i++) { stars.push('star_0quarter')}
    return stars;
  }

  starFilename(starType) {
    return `icons/${starType}.png`
  }

  render() {
    return (
      <span>
        {!this.state.stars ? null :
          this.state.stars.map((starType, i) => {
            // <StarRatingComponent />
            // return <img className="star-rating" key={i} src={this.starFilename(starType)} onClick={(e) => {
            //   if (this.state.clickable) {
            //     this.props.update({ currentRating: i + 1 })
            //   }
            // }}></img>
            // return <StarRatingComponent max={5}/>
          })
        }
      </span>
    )
  }
}

export default StarRating;

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { connect } from 'react-redux';
// import StarRatingComponent from 'react-star-rating-component';

// class StarRating extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       rating: 1
//     };
//   }

//   onStarClick(nextValue, prevValue, name) {
//     this.setState({rating: nextValue});
//   }

//   render() {
//     const { rating } = this.state.rating
//     return (
//       <div>
//         <h2>Rating from state: {rating}</h2>
//         <StarRatingComponent
//           name="rate1"
//           starCount={5}
//           value={rating}
//           onStarClick={this.onStarClick.bind(this)}
//         />
//       </div>
//     );
//   }
// }
// const mapStoreToProps = (state) => ({
//   state
// });
// export default connect(mapStoreToProps)(StarRating);