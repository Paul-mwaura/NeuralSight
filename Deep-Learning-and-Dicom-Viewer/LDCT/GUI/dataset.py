# -*- coding: utf-8 -*-

from torch import from_numpy
from torchvision.transforms import Compose, ToTensor, Normalize
from torchvision.transforms.functional import normalize

class My_Compose(Compose):
    '''inherit torchvision.transforms.Compose kind'''
    def __init__(self, transforms):
        super().__init__(self)
        self.transforms = transforms

    def __call__(self, image):
        '''__call__'''
        for t in self.transforms:
            image = t(image)
        return image
    
class My_ToTensor(ToTensor):
    '''torchvision.transforms.ToTensor'''
    def __init__(self):
        super().__init__()
        
    def __call__(self, image):
        '''__call__'''
        return self.to_tensor(image)
    
    @staticmethod
    def to_tensor(pic):
        pic = pic[:, :, None]
        img = from_numpy(pic.transpose((2, 0, 1))).contiguous()
        return img.float().div(4096)

class My_Normalize(Normalize):
    '''torchvision.transforms.Normalize'''
    def __init__(self, mean, std):
        self.mean = mean
        self.std = std

    def __call__(self, image):
        '''__call__'''
        image = normalize(image, mean=self.mean, std=self.std)
        return image
