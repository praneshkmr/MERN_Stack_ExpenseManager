var ExpenseManager = React.createClass({
    render: function(){
        return (<div>Expense Manager View</div>);
    }
});

var ExpenseList = React.createClass({
    render: function(){
        return(
            <div>
                Expense List View
             </div>
            );
    }
});

var AddExpense = React.createClass({
    render: function () {
        return(<div>Add Expense View</div>);
    }
});

var Expense = React.createClass({
    render:function () {
        return(<div> Expense View</div>);
    }
});

ReactDOM.render(<ExpenseManager />, document.getElementById("content"));