import React from 'react';
import axios from 'axios';


// get number of reviews from GET to /reviews/:product_id/meta and summing
// all property values within the ratings property

class ProductBasics extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      avgRating: undefined,
      numReviews: 0
    }
    // this.getMetaRating = this.getMetaRating.bind(this);
  }


  componentDidMount() {
    // console.log('productBasics mounted')
    // this.getMetaRating(this.props.productInfo.id)
    console.log(this.props)
  }

  // componentDidUpdate(prevProps) {
  //   // console.log('productBasics updated')
  //   if (prevProps.productInfo.id !== this.props.productInfo.id) {
  //     this.getMetaRating(this.props.productInfo.id)
  //   }
  // }


  calcAvgRating(ratings) {
    if (Object.keys(ratings).length === 0) { return }
    let sum = 0;
    let count = 0;
    for (const key in ratings) {
      count += ratings[key];
      sum += Number(key) * Number(ratings[key]);
    }
    this.setState({ numReviews: count })
    return sum / count;
  }

  goToReviews(e) {
    document.getElementById('reviews').scrollIntoView(true)
  }

  render() {
    return (
        <div id="test" className="row">

          <div className="col-sm-12 mt-2 mb-2 mt-4" data-selector="rating">
            <span>
              <StarRating rating={this.state.avgRating} />
              {
              this.state.avgRating === undefined ? null :
                <span onClick={this.goToReviews} className="overview-reviews pl-1">{`Read all ${this.state.numReviews} reviews`}</span>
              }
                </span>
          </div>

          <div className="col-sm-12" data-selector="product-description">
            <div id="fb-root"></div>
            <p>Category: {this.props.productInfo.category}</p>
            <h2>{this.props.productInfo.name}</h2>
            <p>
              {this.props.productInfo.description ? this.props.productInfo.description : null}
            </p>
          </div>
        </div>
    )
  }
}

export default ProductBasics