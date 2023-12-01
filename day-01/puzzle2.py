test_calibration_document = [
  'two1nine',
  'eightwothree',
  'abcone2threexyz',
  'xtwone3four',
  '4nineeightseven2',
  'zoneight234',
  '7pqrstsixteen',
]

with open('day-01/puzzle1-input.txt', 'r') as file:
  real_calibration_document = file.readlines()

spelled_numbers_to_digits = {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
  'zero': 0,
}

spelled_numbers = spelled_numbers_to_digits.keys()

def line_to_spelled_number(line):
  for spelled_number in spelled_numbers:
    if spelled_number in line:
      return spelled_number
  return False

def get_first_digit(line):
  spelled_number = ''
  for character in line:
    if character.isdigit():
      spelled_number = ''
      return int(character)
    if character.isalpha():
      spelled_number += character
      maybe_spelled_number = line_to_spelled_number(spelled_number)
      if maybe_spelled_number:
        return spelled_numbers_to_digits[maybe_spelled_number]
  return 0

def get_last_digit(line):
  spelled_number = ''
  for character in reversed(line):
    if character.isdigit():
      spelled_number = ''
      return int(character)
    if character.isalpha():
      spelled_number = character + spelled_number
      maybe_spelled_number = line_to_spelled_number(spelled_number)
      if maybe_spelled_number:
        return spelled_numbers_to_digits[maybe_spelled_number]
  return 0

def process_calibration_document(document):
  total = 0
  for line in document:
    first_digit = get_first_digit(line)
    last_digit = get_last_digit(line)
    calibration_value = int(f"{first_digit}{last_digit}")
    total += calibration_value
  return total

print(f"Test calibration document results: {process_calibration_document(test_calibration_document)}")
print(f"Real calibration document results: {process_calibration_document(real_calibration_document)}")