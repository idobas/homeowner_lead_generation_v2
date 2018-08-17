import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import './places_autocomplete.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addressChanged} from '../actions/index';
 
class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }
 
  handleChange = address => {
    this.setState({ address });
    this.props.addressChanged(address, false);
  };
 
  handleSelect = address => {
    this.setState({ address });
    const {addressChanged} = this.props;
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => addressChanged(address, true))
      .catch(error => addressChanged(address, false));
  };

  renderSuggestion(suggestion, getSuggestionItemProps) {
    const className = suggestion.active
    ? 'suggestion-item--active'
    : 'suggestion-item';
    return (
      <div
        {...getSuggestionItemProps(suggestion, {
          className,
        })}
      >
        <span>{suggestion.description}</span>
      </div>
    );
  }
 
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="input-container">
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => this.renderSuggestion(suggestion, getSuggestionItemProps))}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addressChanged}, dispatch);
}

export default connect(null, mapDispatchToProps)(LocationSearchInput);