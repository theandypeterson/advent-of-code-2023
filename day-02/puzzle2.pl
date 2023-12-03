use strict;
use warnings;

my %ideal_bag = (
  "red" => 12,
  "green" => 13,
  "blue" => 14,
);

# Open the file
open my $fh, '<', 'games.txt' or die "Could not open file: $!";

# Initialize an array to hold the games
my @games = ();

# Loop over each line in the file
while (my $line = <$fh>) {
  # Remove the newline character
  chomp $line;

  # Parse the line to create a game
  # This is a simple example that splits the line into fields
  
  my ($game_number) = $line =~ /Game (\d+):/;

  my @grabs = ();

  my @fields = split /;/, $line;
  # print "game: ", $game_number, "\n";
  foreach my $field (@fields) {
    # print "field: ", $field, "\n";
    my ($red_number) = $field =~ /(\d+) red/;
    $red_number //= 0;

    my ($blue_number) = $field =~ /(\d+) blue/;
    $blue_number //= 0;

    my ($green_number) = $field =~ /(\d+) green/;
    $green_number //= 0;

    # print "red: ", $red_number, "\n";
    # print "blue: ", $blue_number, "\n";
    # print "green: ", $green_number, "\n";

    my %grab = (
      "red" => $red_number,
      "blue" => $blue_number,
      "green" => $green_number,
    );

    push @grabs, \%grab;
  }

  my %game = (
      "id" => $game_number,
      "grabs" => \@grabs,  # Use array reference
  );

  push @games, \%game;
}

# Close the file
close $fh;

sub determine_minimum_bag {
  my %game = @_;
  my %bag = (
    "red" => 0,
    "green" => 0,
    "blue" => 0,
  );
  foreach my $grab (@{$game{"grabs"}}) {
    foreach my $color (keys %{$grab}) {
      if (($bag{$color} // 0) < ($grab->{$color} // 0)) {
        $bag{$color} = $grab->{$color};
      }
    }
  }
  print "bag: ", %bag, "\n";
  return %bag;
}

sub determine_bag_power {
  my ($bag) = @_;
  my $power = 1;
  foreach my $color (keys %{$bag}) {
    $power *= $bag->{$color};
  }
  return $power;
}

my $count = 0;

foreach my $game (@games) {
  my %bag = determine_minimum_bag(%{$game});
  my $power = determine_bag_power(\%bag);
  $count += $power;
}

print "count: ", $count, "\n";  