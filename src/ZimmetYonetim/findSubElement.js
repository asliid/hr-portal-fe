export const findSubElement = (data, row) => {
    let tempRow;
    if (data.field?.includes('.')) {
      const fields = data.field.split('.');
      if (fields?.length === 2) {
        tempRow = {
          key: data.field,
          value: row[fields[0]][fields[1]],
        };
      } else if (fields?.length === 3) {
        tempRow = {
          key: data.field,
          value: row[fields[0]][fields[1]][fields[2]],
        };
      } else if (fields?.length === 4) {
        tempRow = {
          key: data.field,
          value: row[fields[0]][fields[1]][fields[2]][fields[3]],
        };
      } else if (fields?.length === 5) {
        tempRow = {
          key: data.field,
          value: row[fields[0]][fields[1]][fields[2]][fields[3]][fields[4]],
        };
      } else if (fields?.length === 6) {
        tempRow = {
          key: data.field,
          value: row[fields[0]][fields[1]][fields[2]][fields[3]][fields[4]][fields[5]],
        };
      }
    } else {
      // eslint-disable-next-line no-unused-vars
      tempRow = Object.entries(row)
        .map(([key, value]) => {
          return { key, value };
        })
        .find(x => x.key === data.field);
    }
    return tempRow;
  };
  