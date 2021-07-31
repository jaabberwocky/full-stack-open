export const Hello = ({ name, age, counter }) => {
    const bornYear = () => new Date().getFullYear() - age + counter;
  
    return (
      <div>
        <p>
          Hello {name}, you are {age + counter} years old. ageDiff:{counter}
        </p>
        <p>
          <b>So you were probably born in {bornYear()}</b>
        </p>
      </div>
    );
  };