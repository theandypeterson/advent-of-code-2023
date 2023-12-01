test_calibration_document = [
  '1a',
  'pqr3stu8vwx',
  'a1b2c3d4e5f',
  'treb7uchet',
]

with open('day-01/puzzle1-input.txt', 'r') as file:
  real_calibration_document = file.readlines()

def get_first_digit(line):
  for character in line:
    if character.isdigit():
      return int(character)
  return 0

def get_last_digit(line):
  for character in reversed(line):
    if character.isdigit():
      return int(character)
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
