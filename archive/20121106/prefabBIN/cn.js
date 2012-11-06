require('shelljs/global');
//require('shelljs/make');
require('prefabSHELL/global');

if (!which('node')) {
	echo('Sorry, this script requires NodeJS');
	exit(1);
}
//console.log(prefabSHELL);
clear();
node(args);