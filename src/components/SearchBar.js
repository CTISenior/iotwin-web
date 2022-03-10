/*import * as React from 'react';
import SearchBar from "material-ui-search-bar";

export default function SearchBarItem(props){
    const {items}=props;

    const [rows,setRows]=React.useState(items);
    const [searched,setSearched]=React.useState("");

    const searchRequest=(searchValue)=>{
        const filteredRows=items.filter((row)=>{
            return Object.keys(row).some((key) =>
            row[key].toLowerCase().includes(searchValue)
          );
        });
        setRows(filteredRows);
    }
    const cancelSearch = () => {
        setSearched("");
        searchRequest(searched);
      };

      return (
        <SearchBar
            value={searched}
            onChange={(searchVal) => searchRequest(searchVal)}
            onCancelSearch={() => cancelSearch()}
      />
      );
}*/