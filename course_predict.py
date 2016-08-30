import os
# Define a context manager to suppress stdout and stderr.
class suppress_stdout_stderr(object):
    '''
    A context manager for doing a "deep suppression" of stdout and stderr in 
    Python, i.e. will suppress all print, even if the print originates in a 
    compiled C/Fortran sub-function.
       This will not suppress raised exceptions, since exceptions are printed
    to stderr just before a script exits, and after the context manager has
    exited (at least, I think that is why it lets exceptions through).      

    '''
    def __init__(self):
        # Open a pair of null files
        self.null_fds =  [os.open(os.devnull,os.O_RDWR) for x in range(2)]
        # Save the actual stdout (1) and stderr (2) file descriptors.
        self.save_fds = (os.dup(1), os.dup(2))
    def __enter__(self):
        # Assign the null pointers to stdout and stderr.
        os.dup2(self.null_fds[0],1)
        os.dup2(self.null_fds[1],2)
    def __exit__(self, *_):
        # Re-assign the real stdout/stderr back to (1) and (2)
        os.dup2(self.save_fds[0],1)
        os.dup2(self.save_fds[1],2)
        # Close the null files
        os.close(self.null_fds[0])
        os.close(self.null_fds[1])
with suppress_stdout_stderr():
    from keras.models import load_model # suppress stderr and stdout printing

from collections import OrderedDict
import json
import numpy as np
import sys


MAX_SEM = 21
MAX_COURSE = 13
COURSE_NUM = 9038
enrolljson_dir = 'student_grade_data.json'
ppsk = sys.argv[1]


enrollment_dict = OrderedDict({}) # ppsk and semester are strings, courses are numbers

with open(enrolljson_dir, 'r') as f:
    json_string = f.read()
    enrollment_dict = json.loads(json_string, object_pairs_hook=OrderedDict)


def generateVector(course_list, max_course):
    vector = np.zeros(max_course, dtype='int16')
    if len(course_list) > max_course:
        course_list = random_generator.sample(course_list, len(course_list))
        course_list = course_list[0:max_course]
    for i in range(len(course_list)):
        vector[i] = course_list[i]
    return vector

def multiHotRepresentation(matrix):
    '''
    input dim (sample_num, semester_num, course_num)
    output dim (sample_num, semester_num, COURSE_NUM)
    '''
    sample_num = matrix.shape[0]
    sem_num = matrix.shape[1]
    course_num = matrix.shape[2]
    res_matrix = np.zeros((sample_num, sem_num, COURSE_NUM), dtype='int8')
    for i in range(sample_num):
        for j in range(sem_num):
            input_vec = np.zeros(COURSE_NUM, dtype='int8')
            for k in range(course_num):
                if matrix[i][j][k] > 0:
                    input_vec[matrix[i][j][k] - 1] = 1
            res_matrix[i][j] = input_vec
    return res_matrix

def firstZeroIndex(my_matrix):
    '''
    input: 2D matrix (timestep, vec)
    return: get the first zero vec index in axis 0
    '''
    timestep_num = my_matrix.shape[0]
    label_dim = my_matrix.shape[1]
    zero_vec = np.zeros(label_dim, dtype='int8')
    for i in range(timestep_num):
        if (my_matrix[i, :] == zero_vec).all():
            return i
    return timestep_num - 1  


def getSemesterSegDataset(max_semester=0, max_course=0):
    
    # set up dimension settings for the dataset numpy array
    init_semester = MAX_SEM
    if max_semester > 0:
        init_semester = max_semester
    init_course_num = MAX_COURSE
    if max_course > 0:
        init_course_num = max_course
    # assign memory for matrix that we will our dataset generate from
    x_eval_matrix = np.zeros((1, init_semester, init_course_num), dtype='int16')
    student_dict = enrollment_dict[ppsk]
    x_eval_list = []
    for semester, courses in student_dict.items():
        x_eval_list.append(courses)
    for i in range(len(x_eval_list)):
        x_eval_matrix[0][i] = generateVector(x_eval_list[i], init_course_num)
    eval_input = multiHotRepresentation(x_eval_matrix)
    return eval_input, x_eval_list
try:
	student_dict = enrollment_dict[ppsk]
	model = load_model('model_three.h5')
	eval_input, x_eval_list = getSemesterSegDataset(max_semester=12, max_course=0)

	res = model.predict(eval_input)
	res = res[0]

	index = firstZeroIndex(eval_input[0, :, :])
	top_k_classes = np.argsort(-res[0, index, :])[0:100]
	top_k_classes += 1
	top_k_classes = list(top_k_classes)

	total_semester = []
	for semester in x_eval_list:
		total_semester = total_semester + semester
	i = 0
	for courseNum in top_k_classes:
		if not courseNum in total_semester:
			print (str(courseNum))
			i = i + 1
			if i > 5:
				break
	new_total_semester = set(total_semester)
	new_total_semester = list(new_total_semester)
	for course in new_total_semester:
		print (str(course))
except KeyError:
	print ('Sorry, this ppsk does not exist')






