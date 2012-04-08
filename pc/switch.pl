#!/usr/bin/perl
use strict;
use warnings;


my $file = 'german.txt';

my $counter = 1;
open (CSV, "<", $file) or die $!;

while(<CSV>)
{
    my($line) = $_;
    chomp($line);
    if ($line =~ /(.+)\;(.+)$/)
    {
      my($german) = $2;
      my($english) = "$1";
      print "$german\;$english\n"; 
    }
    else {
        print "$line\n";
    }
}
  

close CSV;
