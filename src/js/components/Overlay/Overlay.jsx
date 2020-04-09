import React from 'react';
import styled from 'styled-components';

const HORIZONTAL_GAP = '20px';

const OverlayColumns = styled.div`
  position: absolute;
  bottom: 0px;
  z-index: 1;
  width: 100%;

  padding-left: 10px;
`;

const OverlayBox = styled.div`
  margin-left: 20px;
  margin-bottom: 30px;
`;

const FormInputs = styled.div`
  margin-left: 20px;
`;

const BoxTitle = styled.h1`
  margin-bottom: ${HORIZONTAL_GAP};
`;

const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AddMarker = styled.div`
  margin-top: ${HORIZONTAL_GAP};
  margin-bottom: ${HORIZONTAL_GAP};
  text-align: center;
`;

const FloatingButton = styled.button`
  position: absolute;
  bottom: 0px;
  z-index: 1;
  margin-left: 20px;
  margin-bottom: 30px;
`;

export default class Overlay extends React.Component {
  constructor() {
    super();

    this.state = {
      overlayShown: false,
      markerLocation: {},
    };
  }

  toggleOverlay = () => {
    this.setState((prevState) => {
      return {
        overlayShown: !prevState.overlayShown,
      };
    });
  };

  handleAddMarker = () => {
    const { addMarker } = this.props;

    addMarker();
  };

  handleSetMarker = () => {
    const { setMarker } = this.props;

    setMarker();

    this.setState({ overlayShown: false });
  };

  render() {
    const { overlayShown } = this.state;
    const { isMarkerShown } = this.props;

    if (overlayShown) {
      return (
        <div className="Overlay">
          <OverlayColumns className="columns">
            <OverlayBox className="box column is-one-third">
              <BoxHeader>
                <div>
                  <BoxTitle className="is-size-3">Report Conditions</BoxTitle>
                </div>
                <div>
                  <button
                    type="button"
                    className="button is-white is-rounded"
                    onClick={this.toggleOverlay}
                  >
                    <i className="far fa-times-circle" />
                  </button>
                </div>
              </BoxHeader>
              <FormInputs>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Name</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <input className="input is-rounded" type="text" />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Condition</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="buttons has-addons">
                        <button type="button" className="button">
                          Snow
                        </button>
                        <button type="button" className="button">
                          Ice
                        </button>
                        <button type="button" className="button">
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </FormInputs>
              <AddMarker>
                {isMarkerShown ? (
                  <div>
                    <button
                      type="button"
                      onClick={this.handleSetMarker}
                      className="button is-success is-rounded"
                    >
                      <i className="fas fa-map-marker-alt" />
                      &nbsp;Set Marker
                    </button>
                    <p className="is-size-7	">
                      lat:{this.props.markerPosition.lat} lng:
                      {this.props.markerPosition.lng}
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={this.handleAddMarker}
                    className="button is-primary is-rounded"
                  >
                    <i className="fas fa-map-marker-alt" />
                    &nbsp;Add Marker
                  </button>
                )}
              </AddMarker>
            </OverlayBox>
          </OverlayColumns>
        </div>
      );
    }

    return (
      <div className="Overlay">
        <FloatingButton
          type="button"
          className="button is-primary is-rounded is-large is-danger"
          onClick={this.toggleOverlay}
        >
          <p>Report an obstruction</p>
          <span className="icon is-large">
            <i className="fas fa-plus" />
          </span>
        </FloatingButton>
      </div>
    );
  }
}
