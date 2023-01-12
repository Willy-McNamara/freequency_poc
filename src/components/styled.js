import styled from 'styled-components';

const AccordianBody = styled.div`
  position: relative;
  opacity: ${props => props.accordian === true ? "100%" : "0"};
  max-height: ${props => props.accordian === true ? "60vh" : "0"};
  overflow: ${props => props.accordian === true ? "auto" : "hidden"};
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;
  transition: max-height 500ms ease-in-out, opacity 700ms ease-in-out, overflow 500ms;
  align-items: center;
`

const ProgressMeter = styled.div`
  margin-top: 25px;
  opacity: ${props => props.accordian === true ? "100%" : "0"};
  transition-property: opacity;
  transition-duration: 1200ms;
  transition-timing-function: ease-in;
`

export {AccordianBody, ProgressMeter}