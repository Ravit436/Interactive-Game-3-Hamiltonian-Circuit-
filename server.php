<?php

$team=$_POST['team'];
$moves=$_POST['moves'];
$sol=$_POST['solution'];

$filehandle=fopen("hamiltonian.txt",'a');
fwrite($filehandle,PHP_EOL .PHP_EOL .PHP_EOL ."\t\tTeam : ".$team.PHP_EOL );
fwrite($filehandle,"\t\tMoves : ".$moves. PHP_EOL . PHP_EOL );
fwrite($filehandle,"\t\t0  |  ".$sol[0].PHP_EOL ."\t\t1  |  ".$sol[1].PHP_EOL ."\t\t2  |  ".$sol[2].PHP_EOL ."\t\t3  |  ".$sol[3].PHP_EOL ."\t\t4  |  ".$sol[4]. PHP_EOL ."\t\t5  |  ".$sol[5].PHP_EOL ."\t\t6  |  ".$sol[6].PHP_EOL ."\t\t7  |  ".$sol[7].PHP_EOL ."\t\t8  |  ".$sol[8].PHP_EOL ."\t\t9  |  ".$sol[9].PHP_EOL ."\t\t10  |  ".$sol[10].PHP_EOL ."\t\t11  |  ".$sol[11].PHP_EOL ."\t\t12  |  ".$sol[12].PHP_EOL ."\t\t13  |  ".$sol[13].PHP_EOL ."\t\t14  |  ".$sol[14].PHP_EOL ."\t\t15  |  ".$sol[15]);
fclose($fileHandle);

echo "Team : ".$team;
?>
