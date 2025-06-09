import './Item.jsx';
import Item from './Item.jsx';

function List({ products }) {
  return (
    <>
      <ol>
        {products.map((value, idx) => {
          return <Item value={value} key={idx} />;
        })}
      </ol>
    </>
  );
}

export default List;
