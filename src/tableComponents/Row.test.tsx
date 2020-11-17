import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BaseRow, {RowInterface} from './Row'

const Row = (props: RowInterface):React.ReactElement => <table><tbody><BaseRow {...props}/></tbody></table>

describe("Row", ()=>{
    test("should be rendered", () => {
        render(<Row
          data = {[2]}
          handleClick = {()=>{}}
          colored ={[true]}
          />);
        const rowElement = screen.getByText(/2/i);
    
        expect(rowElement).toBeInTheDocument();
        expect((rowElement as HTMLInputElement).className).toEqual(
          expect.stringContaining("cell")
        );
  })

  test("should be blue with colored true", () => {
    render(<Row
      data = {[1]}
      handleClick = {()=>{}}
      colored ={[true]}
      />);
    const rowElement = screen.getByLabelText(/cell/i);

    expect((rowElement as HTMLInputElement).style.color).toEqual("blue");
  
  });

  test("should be grey with colored false", () => {
    render(<Row
      data = {[1]}
      handleClick = {()=>{}}
      colored ={[false]}
      />);
    const rowElement = screen.getByLabelText(/cell/i);

    expect((rowElement as HTMLInputElement).style.color).toEqual("grey");
  
  });

  test("should be clicked with cell", () => {
    const handleClick = jest.fn()
    render(<Row
      data = {[1]}
      handleClick = {handleClick}
      colored ={[false]}
      />);
    const rowElement = screen.getByLabelText(/cell/i);

    fireEvent.click(rowElement)  

    expect(handleClick.mock.calls.length).toEqual(1);
  
  });

  
  
  test("should be rendered renderCell", () => {
    render(<Row 
      data = {[2]}
      handleClick = {()=>{}}
      colored ={[true]}
      />);
    const renderCellElement = screen.getByLabelText(/row/i);

    expect(renderCellElement).toBeInTheDocument();
    expect((renderCellElement as HTMLInputElement).className).toEqual(
      expect.stringContaining("row")
    );
})

});
