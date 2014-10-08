var Series = require('./src/base');

Series.Cartesian = require('./src/cartesian');
Series.Line = require('./src/line');
Series.Column = require('./src/column');
Series.Area = require('./src/area');

Series.Pie = require('./src/pie');
Series.Stacked = require('./src/stacked');
Series.ItemGroup = require('./src/itemgroup');

module.exports = Series;
