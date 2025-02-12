import  {Component} from "react";

class Burger extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <> 
              burger
              <div>
                style={{
                    height: "5cm",
                    backgroundColor: "red",
                }}
                more burger</div>
            </>
        );
    }
}



export default Burger;